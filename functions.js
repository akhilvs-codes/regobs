



const { employees } = require("./mockData");


function get_employee_info(name) {
    
  const employee = employees.find(
    (emp) => emp.name.toLowerCase() == name.toLowerCase());

  if (!employee) {
    return { error: "Employee not found" };
  }

  return employee;
}

function create_support_ticket(issue) {
    const ticketId = "TCK-" + Math.floor(Math.random() * 10000);

    return {
        ticket_id: ticketId,
        status: "created",
        issue,
    };
}

module.exports = {
    get_employee_info,
    create_support_ticket,
};
