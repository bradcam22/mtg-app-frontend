FROM node:20-bookworm

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Install pnpm
RUN npm install -g pnpm

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Set working directory
WORKDIR /workspace
