class Fetch {
    async getCurrent(input) {
        const myKey = "d7ddb6b485324f8476383582a2ea3896";

        // Make request to url

        const response = await fetch(
            `http://maps.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}`
        );

        const data = await response.json();

        console.log(data);

        return data;
    }
}