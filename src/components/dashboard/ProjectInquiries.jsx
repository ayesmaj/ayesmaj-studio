import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Mail, Calendar, User } from 'lucide-react';

export default function ProjectInquiries() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await base44.functions.invoke('getProjectInquiries', {});
        setEmails(response.data.emails || []);
      } catch (error) {
        console.error('Failed to fetch emails:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmails();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading project inquiries...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Project Inquiries</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email List */}
        <div className="lg:col-span-1 space-y-3 max-h-96 overflow-y-auto">
          {emails.length === 0 ? (
            <p className="text-gray-500 text-sm">No project inquiries yet</p>
          ) : (
            emails.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedEmail?.id === email.id
                    ? 'bg-[#00ff77]/10 border-[#00ff77]/40'
                    : 'border-white/10 hover:bg-white/5'
                }`}
              >
                <div className="text-sm font-medium text-white truncate">{email.subject}</div>
                <div className="text-xs text-gray-500 truncate">{email.from}</div>
                <div className="text-xs text-gray-600 mt-1">{new Date(email.date).toLocaleDateString()}</div>
              </button>
            ))
          )}
        </div>

        {/* Email Details */}
        <div className="lg:col-span-2">
          {selectedEmail ? (
            <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Subject</label>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedEmail.subject}</h3>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User size={14} />
                    {selectedEmail.from}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={14} />
                    {new Date(selectedEmail.date).toLocaleString()}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Message</label>
                  <p className="text-gray-300 text-sm mt-3 whitespace-pre-wrap break-words">{selectedEmail.body}</p>
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${selectedEmail.from.match(/[^<>]+@[^<>]+/)?.[0] || selectedEmail.from}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff77] text-black text-sm font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,119,0.3)] transition-all"
                  >
                    <Mail size={14} />
                    Reply
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02] flex items-center justify-center h-64">
              <p className="text-gray-500">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}