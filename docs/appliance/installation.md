# Installation

A single script turns a fresh Linux machine into a Humi Appliance.

## Requirements

- A 64-bit Linux machine (x86-64 or ARM64) that uses systemd, e.g. Debian,
  Ubuntu or Raspberry Pi OS. A dedicated machine is best: the installer
  sets up Kubernetes, which takes over ports 80 and 443.
- At least 2 CPU cores, 4 GB of RAM and 20 GB of free disk.
- Root access (`sudo`).
- Internet access, both while installing and afterwards. The Appliance
  keeps pulling its updates from the internet.

## Install

Run this on the machine:

```sh
curl -sfL https://cloud.humi.kaese.space/static-files/appliance/installation/install-appliance.sh | sudo bash
```

The script finishes in a few minutes. It then prints where to find the
Appliance; the Humi services themselves need a few more minutes to start
the first time. To follow along:

```sh
sudo k3s kubectl -n argocd get applications
```

The Appliance is ready once both `argocd` and `humi` are `Synced` and
`Healthy`.

::: tip Check the script first
To read the script before running it, or check it against its published
checksum:

```sh
curl -sfLO https://cloud.humi.kaese.space/static-files/appliance/installation/install-appliance.sh
curl -sfLO https://cloud.humi.kaese.space/static-files/appliance/installation/install-appliance.sh.sha256
sha256sum -c install-appliance.sh.sha256
less install-appliance.sh
sudo bash install-appliance.sh
```
:::

## First start

1. Open `https://<the machine's IP>/setup` in a browser on the same
   network.
2. The Appliance uses a self-signed certificate, so your browser warns you
   the first time. Accept the warning to continue.
3. Create the first user. This account manages the Appliance, and you can
   add more people later.

Connecting the Appliance to [Humi Cloud](../cloud) is optional and is done
from the Appliance's UI afterwards.

## What the script does

1. **Installs [k3s](https://k3s.io)**, a small single-machine Kubernetes.
2. **Installs [ArgoCD](https://argo-cd.readthedocs.io)**, which keeps
   the Appliance in sync with Humi's published configuration in
   [huemie-gitops-base](https://github.com/Kaese72/huemie-gitops-base).
3. **Hands over to ArgoCD.** It applies two ArgoCD Applications: `argocd`
   (ArgoCD managing itself) and `humi` (the Humi services). From then on,
   ArgoCD installs and updates everything else.

After that you don't need to do anything to update the Appliance. When a
new version of Humi or ArgoCD is published, ArgoCD rolls it out.

## Running it again

The script can be run again at any time, for example if an install was
interrupted. It skips the steps that are already done. Running it again
is also how an existing Appliance picks up changes to its two ArgoCD
Applications.

::: warning
ArgoCD's own UI isn't exposed on the network. To reach it, forward a port
from the machine:
`sudo k3s kubectl -n argocd port-forward svc/argocd-server 8443:443`.
:::
