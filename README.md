### TODO

- Should the cloudinary object be in a store?
- Extract constants and put them in a sensible place
- Try having all the index page banners work like the Artifacts is at the moment to see if that speeds things up? This way has it fetching every time, which seems bad, but it also doesn't flash. Maybe there's a better way. Probably.

### Adding Markdown

- Edit button should be disabled if object is locked by another user
- If object is locked by another user, that should display near the edit button
- When clicking the edit button, it should attempt to lock the object. If the object
  can't be locked, it should give an appropriate message and should NOT allow editing.
  The appropriate message might be a toast combined with updating the object so it
  shows the user who has locked the object.
- When editing, the button should say something like 'Save' or 'Commit Changes'
- It might be good to save to a store connected to local storage
- Gotta work out styles
- Show loading states?
- Saving should save and unlock the object
