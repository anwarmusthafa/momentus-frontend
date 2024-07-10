import React from 'react';


const InstagramHome = () => {
  return (
    <div className="instagram-home">
      <header>
        <h1>Instagram</h1>
        <nav>
          <button>Home</button>
          <button>Search</button>
          <button>Create</button>
          <button>Profile</button>
        </nav>
      </header>
      
      <main>
        <div className="stories">
          {/* Add story components here */}
        </div>
        
        <div className="feed">
          {/* Add post components here */}
        </div>
      </main>
      
      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
  );
};

export default InstagramHome;