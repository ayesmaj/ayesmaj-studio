import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { FolderPlus, Loader2, CheckCircle2, ExternalLink } from 'lucide-react';

export default function DriveOrganizer() {
  const [projectTitle, setProjectTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    if (!projectTitle.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const response = await base44.functions.invoke('organizeProjectDrive', {
      action: 'createProjectFolders',
      projectTitle: projectTitle.trim(),
    });
    setLoading(false);
    if (response.data?.success) {
      setResult(response.data);
    } else {
      setError(response.data?.error || 'Something went wrong');
    }
  };

  const driveUrl = (id) => `https://drive.google.com/drive/folders/${id}`;

  return (
    <div style={{ background: '#111', border: '1px solid #222', borderRadius: 16, padding: 32, maxWidth: 480, margin: '0 auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <FolderPlus size={22} style={{ color: '#C8A44E' }} />
        <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em' }}>
          Organize Project in Drive
        </h2>
      </div>

      <p style={{ color: '#666', fontSize: 13, marginBottom: 20 }}>
        Creates a structured Google Drive folder with subfolders: Assets, Renders, References, Deliverables, Feedback.
      </p>

      <input
        type="text"
        placeholder="Project title (e.g. Nike Campaign 2026)"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
        style={{
          width: '100%',
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 8,
          padding: '10px 14px',
          color: '#fff',
          fontSize: 14,
          outline: 'none',
          boxSizing: 'border-box',
          marginBottom: 14,
        }}
      />

      <button
        onClick={handleCreate}
        disabled={loading || !projectTitle.trim()}
        style={{
          width: '100%',
          background: loading || !projectTitle.trim() ? '#2a2a2a' : '#C8A44E',
          color: loading || !projectTitle.trim() ? '#555' : '#000',
          fontWeight: 700,
          fontSize: 14,
          border: 'none',
          borderRadius: 8,
          padding: '11px 0',
          cursor: loading || !projectTitle.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'background 0.2s',
        }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <FolderPlus size={16} />}
        {loading ? 'Creating folders...' : 'Create Drive Structure'}
      </button>

      {error && (
        <p style={{ color: '#f87171', marginTop: 14, fontSize: 13 }}>{error}</p>
      )}

      {result && (
        <div style={{ marginTop: 20, background: '#0d1f14', border: '1px solid #1a3a24', borderRadius: 10, padding: 16 }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} style={{ color: '#00C46A' }} />
            <span style={{ color: '#00C46A', fontWeight: 700, fontSize: 13 }}>Folders created successfully!</span>
          </div>
          <a
            href={driveUrl(result.rootFolder.id)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#C8A44E', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginBottom: 10 }}
          >
            <ExternalLink size={14} /> Open "{result.rootFolder.name}" in Drive
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {result.subfolders.map((f) => (
              <a
                key={f.id}
                href={driveUrl(f.id)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#1a2a1a', border: '1px solid #2a3a2a', borderRadius: 6, padding: '4px 10px', color: '#aaa', fontSize: 12, textDecoration: 'none' }}
              >
                📁 {f.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}