// Function to format numbers with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Replace with your actual YouTube Data API key
const apiKey = 'AIzaSyBUMszFZhXIH63VagfjbtccgeViWHFVLbA';

let previousViewCount = 0; // Variable to store the previous view count
let previousLikeCount = 0; // Variable to store the previous like count
let previousCommentCount = 0; // Variable to store the previous comment count

let highestViewCount = 0;
let lowestViewCount = Infinity;
let highestLikeCount = 0;
let lowestLikeCount = Infinity;
let highestCommentCount = 0;
let lowestCommentCount = Infinity;

// Function to fetch video details, view, like, and comment counts based on video ID
function fetchVideoData(videoId) {
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                const videoTitle = data.items[0].snippet.title;
                const viewCount = parseInt(data.items[0].statistics.viewCount);
                const likeCount = parseInt(data.items[0].statistics.likeCount);
                const commentCount = parseInt(data.items[0].statistics.commentCount);

                // Update video title
                document.getElementById('videoTitle').textContent = videoTitle;

                // Update view count
                let viewText = `👁️ Views: ${numberWithCommas(viewCount)}`;
                const viewDifference = viewCount - previousViewCount;
                if (viewDifference !== 0) {
                    if (viewDifference > 0) {
                        viewText += ` (↑)+${numberWithCommas(viewDifference)}`;
                        document.getElementById('viewCount').classList.add('increase'); // Apply green color class
                    } else {
                        viewText += ` (↓)-${numberWithCommas(Math.abs(viewDifference))}`;
                        document.getElementById('viewCount').classList.add('decrease'); // Apply red color class
                    }
                    setTimeout(() => {
                        document.getElementById('viewCount').classList.remove('increase', 'decrease'); // Remove color class after animation
                    }, 3500); // Remove color class after 3.5 seconds

                    // Update highest and lowest view counts
                    if (viewCount > highestViewCount) {
                        highestViewCount = viewCount;
                    }
                    if (viewCount < lowestViewCount) {
                        lowestViewCount = viewCount;
                    }
                }
                document.getElementById('viewCount').textContent = viewText;

                // Update like count
                let likeText = `👍 Likes: ${numberWithCommas(likeCount)}`;
                const likeDifference = likeCount - previousLikeCount;
                if (likeDifference !== 0) {
                    if (likeDifference > 0) {
                        likeText += ` (↑)+${numberWithCommas(likeDifference)}`;
                        document.getElementById('likeCount').classList.add('increase'); // Apply green color class
                    } else {
                        likeText += ` (↓)-${numberWithCommas(Math.abs(likeDifference))}`;
                        document.getElementById('likeCount').classList.add('decrease'); // Apply red color class
                    }
                    setTimeout(() => {
                        document.getElementById('likeCount').classList.remove('increase', 'decrease'); // Remove color class after animation
                    }, 3500); // Remove color class after 3.5 seconds

                    // Update highest and lowest like counts
                    if (likeCount > highestLikeCount) {
                        highestLikeCount = likeCount;
                    }
                    if (likeCount < lowestLikeCount) {
                        lowestLikeCount = likeCount;
                    }
                }
                document.getElementById('likeCount').textContent = likeText;

                // Update comment count
                let commentText = `💬 Comments: ${numberWithCommas(commentCount)}`;
                const commentDifference = commentCount - previousCommentCount;
                if (commentDifference !== 0) {
                    if (commentDifference > 0) {
                        commentText += ` (↑)+${numberWithCommas(commentDifference)}`;
                        document.getElementById('commentCount').classList.add('increase'); // Apply green color class
                    } else {
                        commentText += ` (↓)-${numberWithCommas(Math.abs(commentDifference))}`;
                        document.getElementById('commentCount').classList.add('decrease'); // Apply red color class
                    }
                    setTimeout(() => {
                        document.getElementById('commentCount').classList.remove('increase', 'decrease'); // Remove color class after animation
                    }, 3500); // Remove color class after 3.5 seconds

                    // Update highest and lowest comment counts
                    if (commentCount > highestCommentCount) {
                        highestCommentCount = commentCount;
                    }
                    if (commentCount < lowestCommentCount) {
                        lowestCommentCount = commentCount;
                    }
                }
                document.getElementById('commentCount').textContent = commentText;

                // Update previous counts for the next comparison
                previousViewCount = viewCount;
                previousLikeCount = likeCount;
                previousCommentCount = commentCount;

                // Log highest and lowest counts
                console.log(`Highest View Count: ${highestViewCount}`);
                console.log(`Lowest View Count: ${lowestViewCount}`);
                console.log(`Highest Like Count: ${highestLikeCount}`);
                console.log(`Lowest Like Count: ${lowestLikeCount}`);
                console.log(`Highest Comment Count: ${highestCommentCount}`);
                console.log(`Lowest Comment Count: ${lowestCommentCount}`);
            } else {
                console.error('No video found with ID:', videoId);
            }
        })
        .catch(error => console.error('Error fetching video details:', error));
}

// Example of handling input change from user
document.getElementById('videoIdInput').addEventListener('change', function(event) {
    const videoId = event.target.value.trim();
    if (videoId !== '') {
        fetchVideoData(videoId);
        // Clear any previous interval
        if (window.fetchInterval) {
            clearInterval(window.fetchInterval);
        }
        // Set an interval to update the data every 10 seconds
        window.fetchInterval = setInterval(() => {
            fetchVideoData(videoId);
        }, 10000);
    }
});
