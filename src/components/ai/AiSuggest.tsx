// import { useState, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import model from "./geminiai";
// import { useAppSelector } from "@/store/hooks";

// const suggestTodo = async ({ temperature, description, city }) => {
//   const prompt = `I'll provide you today's weather, and based on the weather, suggest me 5 to-do items (all in maximum one line). Here temperature = ${temperature}, description = ${description}, and city is ${city}. According to this data, suggest some to-dos.`;

//   const result = await model.generateContent([prompt]);
//   return result.response.text();
// };

// const AiSuggest = () => {
//   const { data } = useAppSelector((state) => state.weather);
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (data) {
//       const { temperature, description, city } = data;

//       const fetchSuggestions = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//           const response = await suggestTodo({ temperature, description, city });
          
//           // Convert the response into an array (assuming each suggestion is on a new line)
//           const suggestionsArray = response
//             .split(",") // Split by new lines
//             .filter(item => item.trim() !== ""); // Remove empty lines

//           setSuggestions(suggestionsArray);
//         } catch (err) {
//           setError("Failed to fetch suggestions");
//           console.error(err);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       fetchSuggestions();
//     }
//   }, [data]);

//   return (
//     <div className="p-4 bg-gray-50 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">🌤️ Weather-Based Suggestions</h2>
      
//       {isLoading ? (
//         <p className="text-gray-600">Loading suggestions...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : suggestions.length > 0 ? (
//         <div className="space-y-3">
//           {suggestions.map((suggestion, index) => (
//             <div 
//               key={index}
//               className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
//             >
//               <p className="text-gray-800">✅ {suggestion}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No suggestions yet. Check back later!</p>
//       )}
//     </div>
//   );
// };

// export default AiSuggest;
import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons"; // Or any icon library
import model from "./geminiai";
const AiSuggest = () => {
  const { data } = useAppSelector((state) => state.weather);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null); // Track which item is copied


  const suggestTodo = async ({ temperature, description, city }) => {
  const prompt = `I'll provide you today's weather, and based on the weather, suggest me 5 to-do items (all in maximum one line). Here temperature = ${temperature}, description = ${description}, and city is ${city}. According to this data, suggest some to-dos.`;

  const result = await model.generateContent([prompt]);
  return result.response.text();
};
//   Copy text to clipboard
const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      // Fallback for insecure contexts (HTTP)
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  useEffect(() => {
    if (data) {
      const fetchSuggestions = async () => {
        setIsLoading(true);
        try {
          const response = await suggestTodo(data);
          const suggestionsArray = response.split(",").filter(item => item.trim());
          setSuggestions(suggestionsArray);
        } catch (err) {
          setError("Failed to fetch suggestions");
        } finally {
          setIsLoading(false);
        }
      };
      fetchSuggestions();
    }
  }, [data]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🌤️ Weather-Based AI Suggestions</h2>
      
      {isLoading ? (
        <p className="text-gray-600">Loading suggestions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : suggestions.length > 0 ? (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex justify-between items-center"
            >
              <p className="text-gray-800">{suggestion}</p>
              <button
                onClick={() => copyToClipboard(suggestion, index)}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <CheckIcon className="text-green-500" />
                ) : (
                  <CopyIcon className="text-gray-500" />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No suggestions yet.</p>
      )}
    </div>
  );
};

export default AiSuggest;