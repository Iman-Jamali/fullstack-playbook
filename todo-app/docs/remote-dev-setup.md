# Remote Development

## Steps to setup a remote development VM on AWS EC2 After its creation

1. Install Docker
  1.1. Install Docker for Ubuntu from [here](https://docs.docker.com/engine/install/ubuntu/).
  1.2. Follow the post installation steps
    1.2.1 [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user)
    1.2.2 [Configure Docker to start on boot with systemd](https://docs.docker.com/engine/install/linux-postinstall/#configure-docker-to-start-on-boot-with-systemd)
2. Install oh-my-zsh
  2.1. Install zsh from [here](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH).
    2.1.1. After installation to make the zsh as default shell you need to do as root user. run `$ sudo su -` to switch to root user and then run `chsh -s $(which zsh)`. Reboot and `zsh` should be your default shell. Verify that by `$echo $SHELL`.
  2.2. Install oh-my-zsh from [here](https://github.com/ohmyzsh/ohmyzsh/wiki)
  2.3. Open `.zshrc` in the root `~` and add your plugins to `plugins=()` line. For example `plugins=(git docker)`
