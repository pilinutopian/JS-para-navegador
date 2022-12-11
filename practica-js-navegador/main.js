const inputElement = document.querySelector('#inputValue');
const inputConcept = document.querySelector('#inputConcept');
const ingresos = document.querySelector('#gains')
const gastos = document.querySelector('#spent')
const buttonElement = document.querySelector('#buttonElement');
const historyLog = document.querySelector('#historylog')
const ahorro = document.querySelector('#Ahorro')

let transacciones = [];

 
class transaccion {
  constructor(concepto, cantidad) {
    this.concepto = concepto;
    this.cantidad = cantidad;
    if (cantidad >= 0) {
      this.ingreso = true;
    } else {
      this.ingreso = false;
    }
    this.id = Math.floor(Math.random() * 100); 
  }
}


buttonElement.addEventListener("click", () => {
  addTransaction();
  loadData();  
  inputElement.value = "";
  inputConcept.value = "";
})

function loadData()
{
  getIncomesAndExpenses();
  showHistory(); 
}

function addTransaction(){
  transacciones.push(new transaccion(inputConcept.value, inputElement.value))
}

function showHistory() {

  while (historyLog.firstChild) {
    historyLog.removeChild(historyLog.firstChild);
  }

  transacciones.forEach(element => {
    const listItemElement = document.createElement("li");
    listItemElement.setAttribute("id", element.id)
    listItemElement.innerText = element.concepto + " " + element.cantidad; 
    historyLog.appendChild(listItemElement);
  
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.addEventListener("click", deleteLogEntry);
    listItemElement.appendChild(deleteButton); 
  });

} 

function getIncomesAndExpenses() {
  let income = 0;
  let expense = 0;

  transacciones.forEach(element => {
    if(element.ingreso)
      income += Number(element.cantidad);
    else
      expense += Number(element.cantidad);
  });
  ingresos.innerHTML = income + " " + "€"
  gastos.innerHTML = expense + " " + "€"
  ahorro.innerHTML = (income + expense) + " " + "€";
}

function deleteLogEntry(event) {

  const removeConfirmation = window.confirm("¿Estás seguro de borrar el log del historial?");

  if (removeConfirmation) {
    let itemToDelete = transacciones.find(x=>x.id==event.currentTarget.parentElement.id);
    if(itemToDelete!=undefined)
    {
      transacciones.splice(transacciones.indexOf(itemToDelete),1);
      loadData();
    }
    }
  }
 
  
