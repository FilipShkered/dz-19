class GalleryApi {
    static URL = 'https://jsonplaceholder.typicode.com/';

    static request(url = '', method = 'GET', body) {
        return fetch(GalleryApi.URL + url, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Can not download data', { cause: response });
            })
    }

    static getList() {
        return GalleryApi.request('albums').catch(() => {
            throw new Error('Can not download albums');
        });
    }

    static getPhotos(albumId) {
        return GalleryApi.request('photos?albumId=' + albumId).catch(() => {
            throw new Error('Can not download photos')
        });
    }

    
  
}