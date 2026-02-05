// Firebase config (same as landing app)
var firebaseConfig = {
  apiKey: "AIzaSyCAkdsO3-Dzbwv6a4QCuEdhWbCmPNCVXtc",
  authDomain: "crodytolaunchingsoon.firebaseapp.com",
  databaseURL: "https://crodytolaunchingsoon-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crodytolaunchingsoon",
  storageBucket: "crodytolaunchingsoon.firebasestorage.app",
  messagingSenderId: "473030269256",
  appId: "1:473030269256:web:d15d063e6e36d37222fb7d"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var tableBody = document.getElementById("tableBody");
var allData = [];

// Fetch data
database.ref("launch_users").once("value", function(snapshot) {
  var count = 1;

  snapshot.forEach(function(child) {
    var data = child.val();

    allData.push({
      phone: data.phone,
      createdAt: data.createdAt
    });

    var row = `
      <tr>
        <td>${count++}</td>
        <td>${data.phone}</td>
        <td>${new Date(data.createdAt).toLocaleString()}</td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
});

// Download CSV
function downloadCSV() {
  if (allData.length === 0) {
    alert("No data available");
    return;
  }

  var csv = "Phone Number,Date\n";

  allData.forEach(function(item) {
    csv += `${item.phone},${item.createdAt}\n`;
  });

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "crodyto-launch-users.csv");
  link.click();
}
