const links = document.querySelector('#conteinerLinks')
const photos = document.querySelector('#conteinerPhotos')

conteinerLinks.addEventListener('click', onLinksClick)


function onLinksClick(e) {
  e.preventDefault()
  
  try {
    const albumId = getAlbumIdByEl(e.target)

    getAlbumPhotos(albumId)
  } catch (e) {
    alert(`Can not get album list: ${e.message}`)
  }
}


GalleryApi.getList().then((list) => {
  const firstAlbum = list[0].id
  renderLinks(list)
  getAlbumPhotos(firstAlbum)

})
.catch(() => {
    alert('Can not get links')
  })


function renderLinks(albums) {
  const html = albums.map(generateLinks).join('')
  
  links.innerHTML = html
}

function generateLinks(album) {
  return `
    <div class="albumLink" data-id="${album.id}">
      <a href="#" id="link">${album.title}</a>
    </div>
    `
}

function getAlbumPhotos(albumId) {
  GalleryApi.getPhotos(albumId).then((list) => {
    renderPhotos(list)
  })

  .catch(() => {
      alert('Can not get photos')
    })
}

function renderPhotos(list) {
  const html = list.map(generatePhotos).join('')
  
  photos.innerHTML = html
}

function generatePhotos(photo) {
  return `<img src=${photo.thumbnailUrl}/>`
}

function getAlbumIdByEl (el) {
  return el?.closest('.albumLink')?.dataset.id
}