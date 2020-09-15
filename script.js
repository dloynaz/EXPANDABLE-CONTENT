
const numOfusers = 4
const endpoint = `https://randomuser.me/api/?results=${numOfusers}`



const userContainer = document.querySelector('.users-container')


const clickHandler = (id) => {
  const boxToStyle = document.getElementById(id)
  const arrowToStyle = document.getElementById(`arr${id}`)
  const dropdown = document.getElementById(`drop${id}`)


  if(arrowToStyle.style.transform === "rotate(0deg)"){
      if(id === 4){
        setTimeout( function() {
            window.scrollTo({ top: 2000, behavior: 'smooth' })
        }, 1000)
      }
    arrowToStyle.style.transform = "rotate(180deg)"
    boxToStyle.style.height = "200px"
    dropdown.style.top = "0px"
  } else {
    arrowToStyle.style.transform = "rotate(0deg)"
    boxToStyle.style.height = "120px"
    dropdown.style.top = "-120px"
  }
}


async function fetchData() {
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
}

async function setUsersHtml() {
    let id = 0;
    const json = await fetchData()
    const html = json["results"].map(user => {
        id += 1
        return `
    <div class="user-box" id=${id}>
        <div class="user-visible-info">
            <div class="img-container">
              <img src=${user["picture"]["large"]}>
            </div>
            <div class="user-visible-text">
                <h2 class="text">${user["name"]["first"]} ${user["name"]["last"]} </h2>
                <h3 class="sub-text">${user["location"]["state"]}, ${user["location"]["country"]}</h3>
            </div>
            <span class="arrow icon-angle-down" id="arr${id}" onclick="clickHandler(${id})"></span>

        </div>
        <div class="user-dropdown-info" id="drop${id}">
            <div class="user-dropdown-text" id="user-dropdown-leftbox">
                <h3 class="drop-text">Phone</h3>
                <h3 class="drop-subtext">${user["phone"]}</h3>
            </div>
            <div class="user-dropdown-text" id="user-dropdown-rightbox">
                <h3 class="drop-text">Email</h3>
                <h3 class="drop-subtext" id="email">${user["email"]}</h3>
            </div>
        </div>
    </div>
        `
    }).join('')
    userContainer.innerHTML = html
}



setUsersHtml()



