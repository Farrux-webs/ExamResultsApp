"use strict";

let API_URL = "http://localhost:8080";

// =================== DATA ==================== //

const getAllData = async () => {
  const response = await fetch(`${API_URL}/Students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  sortData(data);
  searchdata(data)
  dataRender(data);
};
getAllData();

//  ===================== RENDER DATA ===================== //
function dataRender(data = []) {
  data.forEach((e) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.Name}</td>
            <td>${e.lastName}</td>
            <td>${e.Date}</td></td>
            <td>${e.mark}</td>
            <td>${e.mark >= 70 ? "Passed" : "Failed"}</td>
            <td><i class="bi bi-pencil-square" id="editData"  data-edit = "${
              e.id
            }"></i></td>
            <td><i class="bi bi-trash3-fill" id="deleteData" data-del = "${
              e.id
            }"></i></td>
        `;

    $(".wrapper").appendChild(tr);
    $(".countData").innerHTML = data.length;
    $(".AvaragePercentage").innerHTML = data.mark / data.length;
  });
}

function postData() {
  const name = $("#Name").value.trim();
  const lastName = $("#LastName").value.trim();
  const mark = $("#Mark").value;
  const Date = $("#Date").value;

  fetch(`${API_URL}/Students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: name,
      lastName: lastName,
      mark: mark,
      Date: Date,
    }),
  });
}

$(".modalButton").addEventListener("click", (e) => {
  postData();
});

$(".wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-trash3-fill")) {
    const id = e.target.getAttribute("data-del");
    fetch(`${API_URL}/Students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  }
});

// function editData() {
//   const id = localStorage.getItem("editID");
//   console.log(id);
//   const name = $("#Name").value.trim();
//   const lastName = $("#LastName").value.trim();
//   const mark = $("#Mark").value;
//   const Date = $("#Date").value;

//   fetch(`${API_URL}/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       Name: name,
//       lastName: lastName,
//       mark: mark,
//       Date: Date
//     }),
//   });
// }

$("#addNewMember").addEventListener("click", (e) => {
  e.preventDefault();
  $("#modalWindow").style.display = "flex";
  $("#modalCard").style.transform = "translateY(7%)";
});

function hideModal() {
  $("#modalWindow").style.display = "none";
}

$("#closeModalCard").addEventListener("click", (e) => {
  hideModal();
});







// const sortedMarks = [];
// const sortedData = [];
// function sortData(data = []) {
//   data.forEach((e) => {
//     sortedMarks.push(e.mark);
//     sortedData.push(e)
//   });
//   console.log(sortedData);

  


//   $("#ratemark").addEventListener("change", (evt) => {
//     if (evt.target.value == "ToHighest") {
//       sortedData.forEach((e) => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td>${e.id}</td>
//             <td>${e.Name}</td>
//             <td>${e.lastName}</td>
//             <td>${e.Date}</td></td>
//             <td>${e.mark}</td>
//             <td>${e.mark >= 70 ? "Passed" : "Failed"}</td>
//             <td><i class="bi bi-pencil-square" id="editData"  data-edit = "${
//               e.id
//             }"></i></td>
//             <td><i class="bi bi-trash3-fill" id="deleteData" data-del = "${
//               e.id
//             }"></i></td>
//         `;

//         $(".wrapper").appendChild(tr);
//       });
//     }
//   })
// }






function searchdata(data = []){
  data.forEach((e)=>{
    $("#Search").addEventListener('keyup', (evt)=>{
      console.log(evt.target.value);
      $(".wrapper").innerHTML = ''
      if(evt.keyCode == 13){
        setTimeout((time) => {
           if (evt.target.value.trim() == e.Name || evt.target.value.trim() == e.lastName) {
             const tr = document.createElement("tr");
             tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.Name}</td>
            <td>${e.lastName}</td>
            <td>${e.Date}</td></td>
            <td>${e.mark}</td>
            <td>${e.mark >= 70 ? "Passed" : "Failed"}</td>
            <td><i class="bi bi-pencil-square" id="editData"  data-edit = "${
              e.id
            }"></i></td>
            <td><i class="bi bi-trash3-fill" id="deleteData" data-del = "${
              e.id
            }"></i></td>
        `;

             $(".wrapper").appendChild(tr);
             $(".countData").innerHTML = data.length;
           }
        }, '700');
      }
    })
  })
}

const sortedMarks = [];
const sortedData = [];
function sortData(data = []) {
  data.forEach((e) => {
    sortedMarks.push(e.mark);
    sortedData.push(e);
  });
  console.log(sortedData);

  $("#ratemark").addEventListener("change", (evt) => {
    $(".wrapper").innerHTML = "";
    if (evt.target.value == "ToHighest") {
      let order = [0, 100];
      let toHighestData = sortedData.sort((a, b) => a.mark - b.mark);

      toHighestData.forEach((e) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.Name}</td>
            <td>${e.lastName}</td>
            <td>${e.Date}</td></td>
            <td>${e.mark}</td>
            <td>${e.mark >= 70 ? "Passed" : "Failed"}</td>
            <td><i class="bi bi-pencil-square" id="editData"  data-edit = "${
              e.id
            }"></i></td>
            <td><i class="bi bi-trash3-fill" id="deleteData" data-del = "${
              e.id
            }"></i></td>
        `;

        $(".wrapper").appendChild(tr);
      });
    } else if (evt.target.value == "ToLowest") {
      let order = [0, 100];
      let ToLowestData = sortedData.sort((a, b) => b.mark - a.mark);

      ToLowestData.forEach((e) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.Name}</td>
            <td>${e.lastName}</td>
            <td>${e.Date}</td></td>
            <td>${e.mark}</td>
            <td>${e.mark >= 70 ? "Passed" : "Failed"}</td>
            <td><i class="bi bi-pencil-square" id="editData"  data-edit = "${
              e.id
            }"></i></td>
            <td><i class="bi bi-trash3-fill" id="deleteData" data-del = "${
              e.id
            }"></i></td>
        `;

        $(".wrapper").appendChild(tr);
      });
    }
  });
}