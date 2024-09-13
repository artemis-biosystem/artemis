// document.addEventListener('DOMContentLoaded', function () {
//     var headers = document.querySelectorAll('.accordion .header');
//
//     Array.from(headers).forEach(header => {
//         header.addEventListener('click', function() {
//             // Toggle the "active" state of the clicked header
//             this.classList.toggle('active');
//
//             // Select the next sibling element (the content div)
//             var content = this.nextElementSibling;
//
//             // Toggle visibility based on current state
//             if (content.style.display === 'block') {
//                 content.style.display = 'none';
//             } else {
//                 content.style.display = 'block';
//             }
//         });
//     });
// });