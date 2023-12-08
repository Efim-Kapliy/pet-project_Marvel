class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = process.env.REACT_APP_API_KEY;
  _baseOffset = 300;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Cloud not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);

    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 228)}...`
        : "The description of this character has not been found.",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
