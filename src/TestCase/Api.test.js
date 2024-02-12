

async function FetchFunction(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data?.data.result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throwing the error so the caller can handle it if needed
  }
}

describe("Api Componet", () => {
  test(" Api is  Not Null check for data ", async () => {
    const data = await FetchFunction(
      "https://api.npoint.io/4829d4ab0e96bfab50e7"
    );
    expect(data).not.toBeNull();
  });

  it("Check whether we have valid data", async () => {
    const data = await FetchFunction(
      "https://api.npoint.io/4829d4ab0e96bfab50e7"
    );
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({
        id: "1",
        fare: 3840,
        displayData: {
          source: {
            airport: {
              cityCode: "DEL",
              cityName: "Delhi",
              terminal: "3",
              airportCode: "DEL",
              airportName: "Indira Gandhi Airport",
              countryCode: "IN",
              countryName: "India",
            },
            depTime: "2023-03-31T06:20",
          },
          airlines: [
            {
              airlineCode: "AB",
              airlineName: "JetSpice",
              flightNumber: "1234",
            },
          ],
          stopInfo: "Non stop",
          destination: {
            airport: {
              cityCode: "BOM",
              cityName: "Mumbai",
              terminal: "2",
              airportCode: "BOM",
              airportName: "Mumbai",
              countryCode: "IN",
              countryName: "India",
            },
            arrTime: "2023-03-31T08:40",
          },
          totalDuration: "2h 20m",
        },
      }),
    });

    expect(data[0]).toEqual({
      id: "1",
      fare: 3840,
      displayData: {
        source: {
          airport: {
            cityCode: "DEL",
            cityName: "Delhi",
            terminal: "3",
            airportCode: "DEL",
            airportName: "Indira Gandhi Airport",
            countryCode: "IN",
            countryName: "India",
          },
          depTime: "2023-03-31T06:20",
        },
        airlines: [
          {
            airlineCode: "AB",
            airlineName: "JetSpice",
            flightNumber: "1234",
          },
        ],
        stopInfo: "Non stop",
        destination: {
          airport: {
            cityCode: "BOM",
            cityName: "Mumbai",
            terminal: "2",
            airportCode: "BOM",
            airportName: "Mumbai",
            countryCode: "IN",
            countryName: "India",
          },
          arrTime: "2023-03-31T08:40",
        },
        totalDuration: "2h 20m",
      },
    });
  });

});
