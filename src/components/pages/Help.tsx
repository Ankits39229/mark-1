const HelpPage = () => {
  return (
    <div className="p-8 animate-fade-in">
      <h2 className="text-3xl font-light mb-4 text-gray-700">Help</h2>
      <p className="mb-8 text-gray-500">Welcome to the help section.</p>

      <div className="feature-cards">
        <div className="card">
          <h3>📅 Help Feature 1</h3>
          <p>Description of the first help feature</p>
          <button className="card-button" onClick={() => alert('Help Feature 1 activated!')}>Try Feature 1</button>
        </div>
        <div className="card">
          <h3>⚙️ Help Feature 2</h3>
          <p>Description of the second help feature</p>
          <button className="card-button" onClick={() => alert('Help Feature 2 activated!')}>Try Feature 2</button>
        </div>
        <div className="card">
          <h3>📊 Help Statistics</h3>
          <p>View help related statistics and data</p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
