// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  const createBlogButton = document.getElementById('toggle-create-form');
  const createBlogForm = document.getElementById('create-blog-form');

  createBlogButton.addEventListener('click', () => {
      createBlogForm.style.display = 'block';
  });

  createBlogForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.querySelector('#title').value.trim();
      const content = document.querySelector('#content').value.trim();

      if (title && content) {
          const response = await fetch('/api/blogs', {
              method: 'POST',
              body: JSON.stringify({ title, content }),
              headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
              location.reload();
          } else {
              alert('Failed to create blog');
          }
      }
  });

  
    const deleteButtons = document.querySelectorAll('.delete-blog');
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const blogId = button.getAttribute('data-blog-id');
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          location.reload();
        } else {
          alert('Failed to delete blog');
        }
      });
    });

    const editButtons = document.querySelectorAll('.edit-blog');

    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const blogId = button.getAttribute('data-blog-id');
        const editForm = document.getElementById(`edit-form-${blogId}`);
        if (editForm) {
          editForm.style.display = 'block';
        }
      });
    });
    
    const editForms = document.querySelectorAll('.edit-blog-form');

    editForms.forEach(editForm => {
        const saveButton = editForm.querySelector('.save-edit');
        const cancelButton = editForm.querySelector('.cancel-edit');
        const contentField = editForm.querySelector('.edit-content');
        const titleField = editForm.querySelector('.edit-title');

        saveButton.addEventListener('click', async () => {
            const blogId = editForm.getAttribute('data-blog-id');
            const updatedTitle = titleField.value;
            const updatedContent = contentField.value;

            const response = await fetch(`/api/blogs/${blogId}`, {
                method: 'PUT',
                body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                location.reload();
            } else {
                alert('Failed to update blog');
            }
        });

        cancelButton.addEventListener('click', () => {
            // Hide the edit form
            editForm.style.display = 'none';
        });
    });
});