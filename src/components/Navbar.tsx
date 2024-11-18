import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, UserCircle, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/search" className="text-gray-700 hover:text-orange-500 flex items-center space-x-1">
                <Search className="h-5 w-5" />
                <span>Find Chefs</span>
              </Link>
              <Link to="/become-chef" className="text-gray-700 hover:text-orange-500">Become a Chef</Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500">
                    <UserCircle className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-gray-700 hover:text-orange-500"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link to="/signin" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500">
                  <UserCircle className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;