/**
 * CivicMind AI - Vision AI Integration Guide
 *
 * To integrate Vision AI:
 * 1. Enable Cloud Vision API.
 * 2. Use @google-cloud/vision for backend or direct REST API.
 */

export const analyzeInfrastructureImage = async (imageUri: string) => {
  console.log("Vision AI Analysis started for image");

  const mockResults = [
    {
      issue: "Major Pothole Detected",
      confidence: 98.4,
      location: "34.0522° N, 118.2437° W",
      severity: "High",
      tags: ["Road Damage", "Public Safety", "Maintenance Required"],
      description: "A significant structural failure in the asphalt layer measuring approximately 1.2m in diameter. Risk of vehicle damage and hazardous for cyclists."
    },
    {
      issue: "Illegal Dumping Site",
      confidence: 94.2,
      location: "34.0588° N, 118.2411° W",
      severity: "Medium",
      tags: ["Sanitation", "Environmental", "Waste Management"],
      description: "Multiple bags of household waste and discarded furniture detected on public sidewalk. Potential health hazard and block of pedestrian right-of-way."
    },
    {
      issue: "Graffiti Vandalism",
      confidence: 91.5,
      location: "34.0533° N, 118.2455° W",
      severity: "Low",
      tags: ["Vandalism", "Urban Beautification", "Property Damage"],
      description: "Large-scale spray paint mural on municipal utility box. Requires removal to maintain community standards and prevent further degradation."
    },
    {
      issue: "Broken Street Light",
      confidence: 89.9,
      location: "34.0511° N, 118.2488° W",
      severity: "Medium",
      tags: ["Public Safety", "Lighting", "Electrical"],
      description: "Luminaire assembly appears damaged or non-functional. Reduced visibility in the area increases safety risks for nocturnal commuters."
    }
  ];

  // Select a result based on the image URI (simulating different results for different uploads)
  // Since we don't have real AI, we use a hash-like selection
  const index = imageUri.length % mockResults.length;
  const result = mockResults[index];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 2000);
  });
};
