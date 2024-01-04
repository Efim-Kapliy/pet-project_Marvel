import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = process.env.REACT_APP_API_KEY;
  const _baseOffset = 300;
  const _baseOffsetComics = 458;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = _baseOffsetComics) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);

    return res.data.results.map(_transformComics);
  };

  const _transformCharacter = (char) => {
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

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      name: comics.title,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
    };
  };

  return { loading, error, clearError, getCharacter, getAllCharacters, getAllComics };
};

export default useMarvelService;
