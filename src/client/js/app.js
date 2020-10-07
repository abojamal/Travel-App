/* Global Variables */
const data = {};
let handleSubmit = () => {
  const city = document.getElementById('city').value;
  const date = document.getElementById('traveldate').value;
  const enddate = document.getElementById('returndate').value;
  console.log(city, date);

  data.date = date;
  data.city = city;

  const postdata = async (input) => {
    const response = await fetch('/api', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const replyfromserver = await response.json();
    console.log(replyfromserver);

    //DOM
    document.getElementById('info').innerHTML =
      '<h2>Trip to: ' + replyfromserver.city + '</h2>';

    document.getElementById('date').innerHTML =
      'Departing: ' + replyfromserver.date;
    document.getElementById('temp').innerHTML =
      'Typical weather for then is: ' +
      '<br />' +
      'High: ' +
      replyfromserver.weatherHigh +
      ' , Low: ' +
      replyfromserver.weatherLow +
      '<br />' +
      replyfromserver.description;

    document.getElementById('content').innerHTML =
      replyfromserver.city +
      ' Trip is: ' +
      replyfromserver.dateDiff +
      ' days away';
    document.getElementById('length').innerHTML =
      'Trip length: ' + data.triplength;
    const image = document.createElement('img');
    image.src = replyfromserver.cityImage;
    document.getElementById('cityimage').appendChild(image);
  };

  //date Differance calculation and returning 15 for days > 16
  const dateDiff = () => {
    const d = new Date();
    //add 1 to month as it starts with zero as January
    const month = d.getMonth() + 1;
    const firstDate = new Date(
      d.getFullYear() + '-' + month + '-' + d.getDate()
    );

    const secondDate = new Date(date);
    const diff =
      (secondDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24);
    // console.log(Math.floor(diff));

    if (Math.floor(diff) === 0) {
      return 0;
    } else if (Math.floor(diff) <= 15) {
      return Math.floor(diff);
    } else {
      return 15;
    }
  };
  //trip duration
  const triplength = () => {
    const start = new Date(date);
    const end = new Date(enddate);
    const length = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    return Math.floor(length);
  };
  console.log(triplength());
  data.dateDiff = dateDiff();
  data.triplength = triplength();
  postdata(data);
};
export { handleSubmit };
