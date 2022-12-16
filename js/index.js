// set up document for js code
$(document).ready(() => {

    // search filter  --------------------------------------------------
    let searchFilter = $("#search")
    // current sorting method --------------------------------------------------
    let sortingMethod = "#header-name"
    // table --------------------------------------------------
    let tableBody = $("#example tbody")
    let tableRows = $("#example tbody tr")
    // row limite --------------------------------------------------
    let showLimit = $("#table-length")
    let startRange = 1
    let endRange = showLimit.val()
    // footer showing detail --------------------------------------------------
    let showingFrom = $("#showingFrom")
    let showingTo = $("#showingTo")
    let totalCount = $("#totalEntries")
    // current page and page numbers div --------------------------------------------------
    let pageNumberDiv = $("#pageNumberDiv")
    let currentPage = 1

    // first open setup --------------------------------------------------
    // sort,
    sortName(tableBody)
    // filter,
    showData(tableBody, startRange, endRange)
    // update footer detail
    updateInfo(tableRows, startRange, endRange, showingFrom, showingTo, totalCount)
    // set page numbers
    getPageNumbers(pageNumberDiv, showLimit.val(), tableRows.length, currentPage)
    // set up event listeners for pge numbers
    setPageBtnEventListener(tableRows, tableBody, currentPage, showLimit.val(), showingFrom, showingTo, totalCount)
    
    //  --------------------------------------------------
    // Event Listeners -----------------------------------
    //  --------------------------------------------------
    // update search in table on keyup
    searchFilter.on("keyup", (current) => {
        let value = searchFilter.val().toLowerCase()
        tableRows.filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      }).slice(5).remove();
    });
    // entries show change
    showLimit.on("change", () => {
        endRange = showLimit.val()
        updateInfo(tableRows, startRange, endRange, showingFrom, showingTo, totalCount)
        showData(tableBody, startRange, endRange)
        getPageNumbers(pageNumberDiv, endRange, tableRows.length, 1)
        setPageBtnEventListener(tableRows, tableBody, currentPage, showLimit.val(), showingFrom, showingTo, totalCount)
    })
    // header sort change
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
        // if we are updating the column that is already sorting
        if (sortMethod === sortingMethod) {
            // change to the opposite of the current sort
            if ($(`${sortMethod} div`).hasClass("sort-asc")) {
                sortType = "desc"
                $(".sort-asc").addClass("sort-desc")
                $(".sort-asc").removeClass("sort-asc")
            } else {
                $(".sort-desc").addClass("sort-asc")
                $(".sort-desc").removeClass("sort-desc")
            }
        } else {
            // this is a new column to sort by
            sortingMethod = sortMethod
            $(".sort-asc").removeClass("sort-asc")
            $(".sort-desc").removeClass("sort-desc")
            $(`${sortMethod} div`).addClass("sort-asc")
        }

        // sorting method for each header
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
        getPageNumbers(pageNumberDiv, showLimit.val(), tableRows.length, 1)
        // update footer detail
        updateInfo(tableRows, 1, showLimit.val(), showingFrom, showingTo, totalCount)
        // set up event listeners for page numbers
        setPageBtnEventListener(tableRows, tableBody, currentPage, showLimit.val(), showingFrom, showingTo, totalCount)
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