function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

function createHashTable(arr) {
    const hashTable = {};
    for (let i = 0; i < arr.length; i++) {
        hashTable[arr[i]] = i;
    }
    return hashTable;
}

function hashTableSearch(hashTable, target) {
    return hashTable[target] !== undefined ? hashTable[target] : -1;
}


function generateRandomStrings(size, length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const strings = [];
    for (let i = 0; i < size; i++) {
        let str = "";
        for (let j = 0; j < length; j++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        strings.push(str);
    }
    return strings;
}


function measureTime(fn, ...args) {
    const start = performance.now();
    fn(...args);
    const end = performance.now();
    return end - start;
}







document.addEventListener('DOMContentLoaded', () => {
    const arraySize = 1000;
    const randomStrings = generateRandomStrings(arraySize, 10);

    const userInput = prompt("Enter a list of strings separated by space:").split(" ");

    const datasets = [
        { name: "Random Strings", data: randomStrings },
        { name: "User Input", data: userInput }
    ];

    const results = datasets.map(dataset => {
        const { name, data } = dataset;
        data.sort(); // Sorting for binary search

        const target = data[Math.floor(Math.random() * data.length)];

        const linearSearchTime = measureTime(linearSearch, data, target);
        const binarySearchTime = measureTime(binarySearch, data, target);

        const hashTable = createHashTable(data);
        const hashTableSearchTime = measureTime(hashTableSearch, hashTable, target);

        return {
            name,
            linearSearchTime,
            binarySearchTime,
            hashTableSearchTime
        };
    });

    plotResults(results);
});

function plotResults(results) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = results.map(r => r.name);
    const linearSearchData = results.map(r => r.linearSearchTime);
    const binarySearchData = results.map(r => r.binarySearchTime);
    const hashTableSearchData = results.map(r => r.hashTableSearchTime);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Linear Search',
                    data: linearSearchData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Binary Search',
                    data: binarySearchData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Hash Table Search',
                    data: hashTableSearchData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
