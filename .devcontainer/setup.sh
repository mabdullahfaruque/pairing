# .devcontainer/setup.sh
#!/usr/bin/env bash
set -eux

echo "Running setup.sh as the post create command"

# ensure latest version of npm is installed
npm install -g npm@$(npm view npm version)
npm install # install the project dependencies
npm run build
npm run test

# uncomment the following to install playwright browsers
# this is rather big but will allow us to run tests in the devcontainer
# npx playwright install --with-deps

echo "alias l='ls -a -C -a -F --color'" >> ~/.bashrc
echo "alias ll='ls -a -l --color'" >> ~/.bashrc
echo "alias lr='ls -t --color | head -10'" >> ~/.bashrc
echo "alias ..='cd ..'" >> ~/.bashrc

echo "alias gs='git status'" >> ~/.bashrc
echo "alias gl='git log --oneline --graph --decorate --all'" >> ~/.bashrc
echo "alias gaa='git add -A'" >> ~/.bashrc
echo "alias gb='git branch'" >> ~/.bashrc
echo "alias gmm='git commit -m'" >> ~/.bashrc
echo "alias gcm='git add -A && git commit -m'" >> ~/.bashrc
echo "alias gs='git status'" >> ~/.bashrc
echo "alias gco='git checkout'" >> ~/.bashrc
echo "alias grv='git remote --verbose'" >> ~/.bashrc
echo "alias glg='git log --graph --oneline --decorate -n 10'" >> ~/.bashrc
# git log reversed
echo "alias gll='git log --pretty=\"%C(auto)%h %C(reverse)%s%C(reset) 🟣 %C(green)%an <%ae>%C(reset) 🟠 %C(white)%ar%C(reset)\" --date-order --reverse -n 5'" >> ~/.bashrc
# git log graph
echo "alias gl='git log --graph --oneline --pretty=\"%C(auto)%h %d %C(reverse)%s%C(reset) 🔷 %C(white)%ae%C(reset) 🔶 %C(green)%ar%C(reset)\" --color-words | less -R'" >> ~/.bashrc

# give ourselves a nicer prompt in terminal than the default
echo 'export PS1="📂 \w 🖥️\n🤙 "' >> ~/.bashrc

echo "🚀 Devcontainer setup complete."
