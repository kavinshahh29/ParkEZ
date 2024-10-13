import { useState } from 'react';
import axios from 'axios';

const TOKEN = import.meta.env.VITE_MAPBOX_KEY;

export default function SearchForm({ onPlaceSelect }: any) {
  const getPlaces = async (query: string) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=${TOKEN}`
      );
    //   console.log(response.data.features); 
      return response.data.features;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleInputChange = async (event: any) => {
    const { value } = event.target;
    setQuery(value);

    if (value) {
      const fetchedSuggestions = await getPlaces(value);
      setSuggestions(fetchedSuggestions);
    //   console.log(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion : any) => {
    setQuery(suggestion.properties.full_address);

    const latitude = suggestion.properties.coordinates.latitude;
    const longitude = suggestion.properties.coordinates.longitude;

    // console.log({ latitude, longitude });

    onPlaceSelect({ latitude, longitude });

    setSuggestions([]);
  };

  return (
    <div>
     
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter a place you want to find parking"
        className="border-2  text-black p-2 rounded-lg w-1/2 my-4 "
      />
      {suggestions.length > 0 && (
        <ul className="text-black border border-gray-300 rounded-md mt-1 max-h-60  overflow-auto">
          {suggestions.map((suggestion, index) =>
           (
            
            <li
              key={suggestion.id || index} 
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 hover:bg-gray-200 cursor-pointer bg-gray-50 text-black text-lg"
            >
              {suggestion.properties.full_address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
