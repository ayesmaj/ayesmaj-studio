import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const accessToken = await base44.asServiceRole.connectors.getAccessToken('googledrive');
    const { action, projectTitle, parentFolderId } = await req.json();

    // Create a folder in Google Drive
    async function createFolder(name, parentId = null) {
      const meta = {
        name,
        mimeType: 'application/vnd.google-apps.folder',
      };
      if (parentId) meta.parents = [parentId];

      const res = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meta),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Drive API error: ${err}`);
      }
      return res.json();
    }

    if (action === 'createProjectFolders') {
      if (!projectTitle) return Response.json({ error: 'projectTitle required' }, { status: 400 });

      // Create root project folder
      const rootFolder = await createFolder(projectTitle, parentFolderId || null);

      // Create subfolders
      const subfolders = ['Assets', 'Renders', 'References', 'Deliverables', 'Feedback'];
      const created = await Promise.all(
        subfolders.map((name) => createFolder(name, rootFolder.id))
      );

      return Response.json({
        success: true,
        rootFolder: { id: rootFolder.id, name: rootFolder.name },
        subfolders: created.map((f) => ({ id: f.id, name: f.name })),
      });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});