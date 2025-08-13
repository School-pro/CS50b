let form = document.querySelector('#create-form')
let itemField = document.querySelector('#create-field')
let listItems = document.querySelector('#item-list')

function borderMe() {
   
    // if(listItems.length) {
    //     listItems.classList.add('border')
    // } else {
    //     listItems.classList.remove('border')
    // }
}

borderMe()

form.addEventListener('submit', function(e) {
    e.preventDefault()
    if(itemField.value) {
    axios.post('/create-item', {text: itemField.value}).then(function(response) {
        listItems.insertAdjacentHTML('beforeend', itemTemplate(response.data))
        itemField.value = ""
        itemField.focus()
    }).catch((err) => err)
}
})

function itemTemplate(item) {
    return`
    <li class="flex items-center justify-between p-1 hover:bg-gray-50">
    <span class="item-text ml-2">${item.name}</span>
    <div>
        <button data-id="${item._id}" class="edit-me p-2 px-3 md:px-5 bg-green-700 hover:bg-green-900 rounded text-white"><i class="fa-solid fa-pen md:hidden"></i><span class="hidden md:block">Edit</span></button>
        <button data-id="${item._id}" class="delete-me p-2 px-3 md:px-5 bg-red-700 hover:bg-red-900 rounded text-white"><i class="fa-solid fa-trash md:hidden"></i><span class="hidden md:block">Delete</span></button>
    </div>
</li>
    `
}

// Client side rendering of the list items
let listItem = iteming.map((item) => {
    return itemTemplate(item)
}).join('')

listItems.insertAdjacentHTML('beforeend', listItem)

document.addEventListener('click', function(e) {
    // Edit features
    if(e.target.classList.contains('edit-me')) {
        let editText = prompt('Enter the desired item', e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
        if(editText) {
            axios.post('/update-item', {text: editText, id: e.target.getAttribute('data-id')}).then(function () {
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = editText
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    // Delete features
    if(e.target.classList.contains('delete-me')) {
        if(confirm('Do you really want to delete this item?')) {
            axios.post('/delete-item', {id: e.target.getAttribute('data-id')}).then(function() {
                e.target.parentElement.parentElement.remove()
            }).catch((err) => {
                console.log(err)
            })
        }
    }
})