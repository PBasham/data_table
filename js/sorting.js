const sortName = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(1)', a).text().localeCompare($('td:nth-child(1)', b).text());
        } else {
            return $('td:nth-child(1)', b).text().localeCompare($('td:nth-child(1)', a).text());
        }
    }).appendTo(tableBody)
}

const sortPosition = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(2)', a).text().localeCompare($('td:nth-child(2)', b).text());
        } else {
            return $('td:nth-child(2)', b).text().localeCompare($('td:nth-child(2)', a).text());
        }
    }).appendTo(tableBody)
}
const sortOffice = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(3)', a).text().localeCompare($('td:nth-child(3)', b).text());
        } else {
            return $('td:nth-child(3)', b).text().localeCompare($('td:nth-child(3)', a).text());
        }
    }).appendTo(tableBody)
}
const sortAge = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(4)', a).text().localeCompare($('td:nth-child(4)', b).text());
        } else {
            return $('td:nth-child(4)', b).text().localeCompare($('td:nth-child(4)', a).text());
        }
    }).appendTo(tableBody)
}
const sortStartDate = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(5)', a).text().localeCompare($('td:nth-child(5)', b).text());
        } else {
            return $('td:nth-child(5)', b).text().localeCompare($('td:nth-child(5)', a).text());
        }
    }).appendTo(tableBody)
}
const sortSalary = (tableBody, type = "asc") => {
    tableBody.find("tr").sort((a, b) => {
        if (type === "asc") {
            return $('td:nth-child(6)', a).text().replace(/[$,]/g, '').localeCompare($('td:nth-child(6)', b).text().replace(/[$,]/g, ''), "en", {numeric: true});
        } else {
            return $('td:nth-child(6)', b).text().replace(/[$,]/g, '').localeCompare($('td:nth-child(6)', a).text().replace(/[$,]/g, ''), "en", {numeric: true});
        }
    }).appendTo(tableBody)
}