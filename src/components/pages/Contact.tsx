const ContactPage = () => {
  return (
    <div className="p-8 animate-fade-in">
      <h2 className="text-3xl font-light mb-4 text-gray-700">Contact</h2>
      <p className="mb-8 text-gray-500">Welcome to the contact section.</p>

      <div className="feature-cards">
        <div className="card">
          <h3>📅 Contact Feature 1</h3>
          <p>Description of the first contact feature</p>
          <button className="card-button" onClick={() => alert('Contact Feature 1 activated!')}>Try Feature 1</button>
        </div>
        <div className="card">
          <h3>⚙️ Contact Feature 2</h3>
          <p>Description of the second contact feature</p>
          <button className="card-button" onClick={() => alert('Contact Feature 2 activated!')}>Try Feature 2</button>
        </div>
        <div className="card">
          <h3>📊 Contact Statistics</h3>
          <p>View contact related statistics and data</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
