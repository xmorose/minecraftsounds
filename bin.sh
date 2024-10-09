# Step 5: For each commit, run these commands:
while git rebase --continue; do
  git commit --amend --reset-author --no-edit
done

# Step 6: Force push the changes to GitHub
git push --force origin master