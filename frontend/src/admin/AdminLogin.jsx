import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@exergy.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img
              src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
              alt="Exergy Solutions"
              className="w-9 h-9 object-contain"
            />
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-display">
              Exergy Solutions<span className="text-[#30a66a]">.</span>
            </span>
          </Link>
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0c758d] uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure Owner & Executive Admin Panel</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Sign In to Your Dashboard
            </h2>
            <p className="text-xs text-slate-500">
              Enter your credentials to access lead logs and analytics.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@exergy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#0c758d] hover:bg-[#095f73] text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating with Bcrypt...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo helper */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <button
              type="button"
              onClick={handleDemoFill}
              className="inline-flex items-center gap-1.5 text-xs text-[#0c758d] hover:text-[#095f73] transition-colors font-medium"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Fill Default Demo Credentials (admin@exergy.com)</span>
            </button>
            <div className="text-[11px] text-slate-400">
              Secured with bcrypt password hashing and signed JWT sessions
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
            ← Return to Exergy Solutions Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
