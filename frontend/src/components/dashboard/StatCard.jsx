const StatCard = ({ label, value, sub, icon }) => {
  return (
    <div className="stat-card">

      {icon && <div className="stat-icon-wrapper">{icon}</div>}

      <span className="stat-label">{label}</span>

      <span className="stat-value">{value}</span>

      {sub && <small>{sub}</small>}

    </div>
  );
};

export default StatCard;