// comment.js
document.querySelector('#comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const content = document.querySelector('#comment-content').value.trim();
    const commentForm = document.querySelector('#comment-form');

    if (content) {
      const response = await fetch(`/api/blogs/${commentForm.dataset.blogId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        location.reload(); //refreshes on success
      } else {
        alert('Failed to submit comment');
      }
    }
  });
  
  