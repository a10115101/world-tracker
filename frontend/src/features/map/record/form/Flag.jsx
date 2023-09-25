function Flag({ record }) {
  return (
    <>
      <img
        src={`https://flagcdn.com/w80/${record.countryCode}.png`}
        width="80"
        alt="flag"
      />
      <div>
        <h2>Country: {record.country}</h2>
        <h3>City: {record.cityName}</h3>
      </div>
    </>
  );
}

export default Flag;
