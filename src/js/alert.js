 async function alertMessage(){
  const response = await fetch("alerts.json");
  const data = await response.json();
  console.log(data);
 }
 
 alertMessage();

