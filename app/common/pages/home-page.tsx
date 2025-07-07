import { Button } from "~/common/components/ui/button";
import { GoogleGenAI } from "@google/genai";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { ProductCard } from "~/features/products/components/product-card";
import { useState } from "react";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY! });

  async function generateContent({ prompt }: { prompt: string }) {
    if (prompt.length === 0) return;
    setIsLoading(true);
    setResponse("");

    const fullPrompt = `Please answer the following question. Provide the response strictly in the following JSON format, without any extra text or explanations before or after the JSON block.
The JSON object must contain these exact keys: "question", "answer", and "confidence".
- "question": The original question asked, which is: "${prompt}"
- "answer": Your detailed answer to the question.
- "confidence": Your confidence in the answer, which must be one of these values: "High", "Medium", or "Low".

Your JSON response:
`;

    try {
      const generatedResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        // config: {
        //   thinkingConfig: {
        //     thinkingBudget: 0, // Disables thinking
        //   },
        // },
      });

      console.log("Raw AI Response:", generatedResponse.text);

      if (generatedResponse.text) {
        try {
          const cleanedText = generatedResponse.text
            .replace(/```json\n|```/g, "")
            .trim();
          const jsonResponse = JSON.parse(cleanedText);
          setResponse(JSON.stringify(jsonResponse, null, 2));
        } catch (error) {
          console.error("Failed to parse JSON:", error);
          setResponse(
            "Error: The response was not valid JSON.\n\n" +
              generatedResponse.text
          );
        }
      } else {
        setResponse("No response from AI.");
      }
    } catch (error) {
      console.error(error);
      setResponse("Error generating content");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = () => {
    // Handle the submission logic here
    generateContent({ prompt: inputValue });
  };

  return (
    <div className="container mx-auto px-20 py-20 ">
      <h1 className="text-3xl font-bold">Welcome Home</h1>
      <p className="mt-4">This is your home page.</p>
      <Button variant="link" asChild className="text-lg p-0">
        {/* <Link to="/products/leaderboards">Explore all products &rarr;</Link> */}
      </Button>
      <ProductCard
        title="Product 1"
        content="This is a product"
        description="This is a product"
      />
      {/* <Link to="/products/productId">
        <ProductCard
          title="Product 1"
          content="This is a product"
          description="This is a product"
        />
      </Link> */}

      <div className="mt-8 flex w-full max-w-sm items-center space-x-2">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="text-input">Enter Text</Label>
          <Input
            id="text-input"
            type="text"
            placeholder="Your text here..."
            // value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {isLoading ? (
          <Button size="sm" disabled className="self-end">
            <Loader2Icon className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="self-end cursor-pointer"
            onLoad={() => setIsLoading(true)}
          >
            Submit
          </Button>
        )}
      </div>
      {response && (
        <pre className="mt-4 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{response}</code>
        </pre>
      )}
    </div>
  );
}
