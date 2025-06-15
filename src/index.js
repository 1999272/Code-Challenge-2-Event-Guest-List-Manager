document.addEventListener('DOMContentLoaded', function() {
  // Get all the elements we need
  const guestForm = document.getElementById('guest-form');
  const nameInput = document.getElementById('guest-name');
  const categorySelect = document.getElementById('guest-category');
  const guestList = document.getElementById('guest-list');
  const guestCount = document.getElementById('guest-count');
  
  // Store our guests
  let guests = [];
  let isEditing = false;
  let currentEditId = null;

  // Handle form submission
  guestForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const category = categorySelect.value;
    
    if (!name) return;
    
    if (isEditing) {
      // Update existing guest
      updateGuest(currentEditId, name, category);
    } else {
      // Add new guest
      addGuest(name, category);
    }
    
    resetForm();
  });

  // Add a new guest
  function addGuest(name, category) {
    if (guests.length >= 10) {
      alert('Guest list is full (maximum 10 guests)');
      return;
    }
    
    const newGuest = {
      id: Date.now(),
      name: name,
      category: category,
      attending: true
    };
    
    guests.push(newGuest);
    updateGuestList();
  }

  // Update an existing guest
  function updateGuest(id, name, category) {
    const guest = guests.find(g => g.id === id);
    if (guest) {
      guest.name = name;
      guest.category = category;
      updateGuestList();
    }
  }

  // Remove a guest
  function removeGuest(id) {
    guests = guests.filter(guest => guest.id !== id);
    updateGuestList();
  }

  // Toggle attending status
  function toggleAttending(id) {
    const guest = guests.find(g => g.id === id);
    if (guest) {
      guest.attending = !guest.attending;
      updateGuestList();
    }
  }

  // Edit a guest
  function editGuest(id) {
    const guest = guests.find(g => g.id === id);
    if (guest) {
      nameInput.value = guest.name;
      categorySelect.value = guest.category;
      isEditing = true;
      currentEditId = id;
      guestForm.querySelector('button').textContent = 'Update Guest';
    }
  }

  // Update the displayed list
  function updateGuestList() {
    guestList.innerHTML = '';
    guestCount.textContent = guests.length;
    
    guests.forEach(guest => {
      const guestItem = document.createElement('li');
      guestItem.className = `guest-item ${guest.attending ? 'attending' : 'not-attending'}`;
      
      guestItem.innerHTML = `
        <div class="guest-info">
          <span class="guest-name">${guest.name}</span>
          <span class="guest-category ${guest.category}">${guest.category}</span>
        </div>
        <div class="guest-actions">
          <button class="rsvp-btn">${guest.attending ? 'Attending' : 'Not Attending'}</button>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Remove</button>
        </div>
      `;
      
      // Add event listeners
      guestItem.querySelector('.delete-btn').addEventListener('click', () => removeGuest(guest.id));
      guestItem.querySelector('.rsvp-btn').addEventListener('click', () => toggleAttending(guest.id));
      guestItem.querySelector('.edit-btn').addEventListener('click', () => editGuest(guest.id));
      
      guestList.appendChild(guestItem);
    });
  }

  // Reset the form after submission
  function resetForm() {
    nameInput.value = '';
    categorySelect.value = 'friend';
    isEditing = false;
    currentEditId = null;
    guestForm.querySelector('button').textContent = 'Add Guest';
  }
});