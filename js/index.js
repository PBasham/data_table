// set up document for js code
$(document).ready(() => {



    let tableLength = $("#table-length")
    let searchFilter = $("#search")

    let table = $("#example")
    let tableBody = $("#example tbody")
    let exampleTable = $("#example tbody tr")

    let showingFrom = $("#showingFrom")
    let showingTo = $("#showingTo")
    let totalCount = $("#totalEntries")

    let startRange = 1
    let endRange = tableLength.val()
    let pageNumberDiv = $("#pageNumberDiv")
    let currentPage = 1



    let sortingMethod = "#header-name"



    // sort,
    sortName(tableBody)
    // filter,
    showData(tableBody, startRange, endRange)
    // update footer detail
    updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
    // set page numbers
    getPageNumbers(pageNumberDiv, tableLength.val(), exampleTable.length, currentPage)
    //
    setPageBtnEventListener(exampleTable, tableBody, currentPage, tableLength.val(), showingFrom, showingTo, totalCount)

    searchFilter.on("keyup", (current) => {
        let value = searchFilter.val().toLowerCase()
        // unhide all,
        // search every row,
        // if it matches the criteria then 


        exampleTable.filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      }).slice(5).remove();
    });

    //  --------------------------------------------------
    // Event Listeners -----------------------------------
    //  --------------------------------------------------
    // length change
    tableLength.on("change", () => {
        endRange = tableLength.val()
        updateInfo(exampleTable, startRange, endRange, showingFrom, showingTo, totalCount)
        showData(tableBody, startRange, endRange)
        // every time the length changes, update how many pages there are.
        getPageNumbers(pageNumberDiv, endRange, exampleTable.length, 1)

        setPageBtnEventListener(exampleTable, tableBody, currentPage, tableLength.val(), showingFrom, showingTo, totalCount)
    })

    $(".header").on("click", (e) => {
        handleSort(`#${$(e.currentTarget).attr("id")}`)
    })

    // Sorting function --------------------------------------------------
    const handleSort = (sortMethod) => {
        let sortType = "asc"
        // unhide everything before sort
        $(`tbody tr`).each((idx, currentRow) => {
            currentRow.style.display = ""
        })
        if (sortMethod === sortingMethod) {
            if ($(`${sortMethod} div`).hasClass("sort-asc")) {
                sortType = "desc"
                $(".sort-asc").addClass("sort-desc")
                $(".sort-asc").removeClass("sort-asc")
            } else {
                $(".sort-desc").addClass("sort-asc")
                $(".sort-desc").removeClass("sort-desc")

            }
        } else {
            sortingMethod = sortMethod
            $(".sort-asc").removeClass("sort-asc")
            $(".sort-desc").removeClass("sort-desc")
            $(`${sortMethod} div`).addClass("sort-asc")
        }

        // sort everything
        if (sortingMethod === "#header-name") {
            sortName(tableBody, sortType)
        } else if (sortMethod === "#header-position") {
            sortPosition(tableBody, sortType)
        } else if (sortMethod === "#header-office") {
            sortOffice(tableBody, sortType)
        } else if (sortMethod === "#header-age") {
            sortAge(tableBody, sortType)
        } else if (sortMethod === "#header-start") {
            sortStartDate(tableBody, sortType)
        } else if (sortMethod === "#header-salary") {
            sortSalary(tableBody, sortType)
        }

        // re-hide everything
        showData(tableBody, startRange, endRange)
        // update page number
        getPageNumbers(pageNumberDiv, tableLength.val(), exampleTable.length, 1)
        // update footer detail
        updateInfo(exampleTable, 1, tableLength.val(), showingFrom, showingTo, totalCount)

        setPageBtnEventListener(exampleTable, tableBody, currentPage, tableLength.val(), showingFrom, showingTo, totalCount)

    }


})

//  --------------------------------------------------
//      End of main
//  --------------------------------------------------

// functions --------------------------------------------------
const showData = (table, start, end) => {
    table.find("tr").each((idx, currentRow) => {
        if (idx + 1 >= start && idx + 1 <= end) {
            currentRow.style.display = ""
        } else {
            currentRow.style.display = "none"
        }
    })
}
const updateInfo = (table, startRange, endRange, from, to, total) => {
    from.html(startRange)
    to.html(endRange > table.length ? table.length : endRange)
    total.html(table.length)
}

const getPageNumbers = (div, showLength, total, activePage) => {
    div.html(`<button id="btn-previous" class="page-btn btn" >Previous</button>`)
    for (let i = 1; i <= Math.ceil(total / showLength); i++) {
        div.append(`<button id="btn-${i}" class="page-btn btn ${i === activePage ? "active" : ""}" >${i}</button>`)
    }
    div.append(`<button id="btn-next" class="page-btn btn" >Next</button>`)
}

const setPageBtnEventListener = (table, tableBody, currentPage, tableLength, from, to, total) => {
    $(".page-btn").on("click", (e) => {
        let goToPage = ""
        if (e.target.innerText === "Next") {
            if (!$(`#btn-${currentPage + 1}`).length) return
            goToPage = currentPage + 1
        } else if (e.target.innerText === "Previous") {
            if (!$(`#btn-${currentPage - 1}`).length) return
            goToPage = currentPage - 1
        } else {
            goToPage = parseInt(e.target.innerText)

        }
        if (goToPage !== currentPage) {
            // call for page change
            showData(tableBody, goToPage * tableLength - tableLength + 1, goToPage * tableLength)
            updateInfo(table, goToPage * tableLength - tableLength + 1, goToPage * tableLength, from, to, total)
            currentPage = goToPage
            $(`.btn`).removeClass(" active ")
            $(`#btn-${goToPage}`).addClass("active")
        }
    })
}