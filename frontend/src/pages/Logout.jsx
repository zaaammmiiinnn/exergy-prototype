import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-[#30a66a] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">
            Signed Out Successfully
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your session has been securely closed. Thank you for using the Exergy Solutions engineering management platform.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0c758d] text-white text-xs font-semibold hover:bg-[#095f73] transition-colors shadow-xs"
          >
            <span>Log In Again</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
