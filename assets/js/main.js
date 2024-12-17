// Function to calculate frequency of elements in an array
function calculateFrequency(array) {
    const frequency = {};
    array.forEach(value => {
        frequency[value] = (frequency[value] || 0) + 1;
    });
    // normalize frequency
    const total = array.length;
    for (const key in frequency) {
        frequency[key] /= total;
    }
    return frequency;
}

// Kernel Smoothing Function (Gaussian Kernel)
function gaussianKernel(frequencies, sigma = 0.1) {
    const keys = Object.keys(frequencies).map(Number);
    const minKey = Math.min(...keys);
    const maxKey = Math.max(...keys);

    const smoothedData = [];
    const range = [];

    for (let x = minKey; x <= maxKey; x++) {
        let sum = 0;
        keys.forEach(key => {
            const gaussian = Math.exp(-0.5 * ((x - key) ** 2) / sigma ** 2);
            sum += frequencies[key] * gaussian;
        });
        smoothedData.push(sum);
        range.push(x);
    }
    return { range, smoothedData };
}

// Fetch JSON and render histogram with kernel smoothing
document.addEventListener("DOMContentLoaded", function () {
    fetch('/assets/data/columns_data.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            console.log("HTTP success, loading JSON...");
            return response.json();
        })
        .then(data => {
            if (!data.runtime.original || !data.runtime.remakes) {
                throw new Error("Invalid JSON structure: 'runtime.original' or 'runtime.remakes' is missing.");
            }

            // Calculate frequencies
            const freqOriginal = calculateFrequency(data.runtime.original);
            const freqRemakes = calculateFrequency(data.runtime.remakes);

            // Apply Gaussian Kernel Smoothing
            const smoothedOriginal = gaussianKernel(freqOriginal, 2.0);
            const smoothedRemakes = gaussianKernel(freqRemakes, 2.0);

            // Render Chart.js Bar Chart with Line Smoothing
            const ctx = document.getElementById('chart-1-2-1').getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Histogram style
                data: {
                    labels: smoothedOriginal.range, // X-axis: range of values
                    datasets: [
                        {
                            type: 'line',
                            label: 'Originals',
                            data: smoothedOriginal.smoothedData,
                            borderColor: 'blue',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                            tension: 0.4
                        },
                        {
                            type: 'line',
                            label: 'Remakes',
                            data: smoothedRemakes.smoothedData,
                            borderColor: 'red',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Runtime (minutes)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Frequency'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON file
    fetch('/assets/data/features_mean_by_year.json')
        .then(response => response.json())
        .then(data => {
            const years = data.year;
            const voteAverage = data.vote_average;
            const starPopularity = data.star_1_popularity;
            const adjustedBudget = data.adjusted_budget.map(value => value / 1000000);

            const ctx1 = document.getElementById('chart-1-3-1').getContext('2d');
            new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Vote Average',
                        data: voteAverage,
                        borderColor: 'blue',
                        borderWidth: 2,
                        pointRadius: 1.5,
                        pointHoverRadius: 4,
                        pointBackgroundColor: 'blue',
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: 'Year' } },
                        y: { title: { display: true, text: 'Vote Average' } }
                    }
                }
            });

            // Chart 2: Star 1 Popularity
            const ctx2 = document.getElementById('chart-1-3-2').getContext('2d');
            new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Star Popularity',
                        data: starPopularity,
                        borderColor: 'green',
                        borderWidth: 2,
                        pointRadius: 1.5,
                        pointHoverRadius: 4,
                        pointBackgroundColor: 'green',
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: 'Year' } },
                        y: { title: { display: true, text: 'Star 1 Popularity' } }
                    }
                }
            });

            // Chart 3: Adjusted Budget
            const ctx3 = document.getElementById('chart-1-3-3').getContext('2d');
            new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Adjusted Budget',
                        data: adjustedBudget,
                        borderColor: 'red',
                        borderWidth: 2,
                        pointBackgroundColor: 'red',
                        fill: false,
                        tension: 0.1,
                        pointRadius: 1.5,
                        pointHoverRadius: 4,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: 'Year' } },
                        y: { title: { display: true, text: 'Adjusted Budget' } }
                    }
                }
            });
        })
        .catch(error => console.error("Error loading JSON file:", error));
});