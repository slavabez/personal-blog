---
title: ThinkPad X1 Extreme gen 2 NVIDIA on Linux issues
date: "2020-02-05T15:40:32.169Z"
description: Lenovo ThinkPad X1 Extreme gen 2 has an issue with the way the external monitors on Linux. Here's my solution\workaround.
---

## Where is my monitor?!

I installed Linux on my X1 Extreme and I can't connect to any monitor. Help?

## The issue

If you're lucky enough to own an X1 Extreme, you might run into an issue on Linux with plugging in external monitors. The issue is that the HDMI port, as well as the DisplayPort (via the usb-C/Thunderbolt) ports are wired through the dedicated NVIDIA 1650 graphics card.

If you're like me and want to get great battery life, you're probably using the laptop with the dedicated NVIDIA card switched off. My extremely simple and non-scientific testing using `sudo powertop` showed that switching to the Intel-only mode saves around 2-3 Watts of power, which should help save around an hour or so of battery life.

So essentially, if you use **Linux** and have the **NVIDIA GPU turned off**, you won't be able to connect an external monitor via HDMI or DP-over-USB Type-C.

## My setup

My laptop is the **ThinkPad X1 Extreme 2nd**, product number **20QVCTO1WW**, with the _500-nit Full HD screen, i7-9750H, 32GB of Crucial RAM and 2 NVMe SSDs_ (1TB + 256GB, both Samsung drives).

I've tested the external monitor connectivity on my X1 Extreme gen 2 with the following Linux setups:

### Testing on Pop!\_OS 19.10

Switching graphics modes requires a **full system restart**.

- Intel only mode - no output with a monitor connected
- Hybrid mode - no output with a monitor connected
- NVIDIA mode - external monitor output works well

### Testing on Manjaro Linux 18.1.5 (GNOME and KDE)

#### Using Bumblebee

[**Bumblebee**](https://wiki.archlinux.org/index.php/Bumblebee) is a hybrid graphics solution for laptops with hybrid Intel + NVIDIA graphics. I followed [Charl P Botha's instructions](https://vxlabs.com/2019/07/28/manjaro-bumblebee-thinkpad-x1-extreme-2019/) and set up a hybrid graphics with everything running off the Intel card by default, and NVIDIA only kicking in when invoked with the `optirun` command.

Using `intel-virtual-output` my laptop is able to connect to an external monitor, but the system would slow down to a crawl for some reason, making the laptop unusable. I do not have the knowledge or experience to fix this, so I looked for other options.

_Conclusion - works well without monitor, not so well when you need to plug one in._ At least for me and at least with `intel-virtual-output`.

#### Using Optimus Manager

[Optimus Manager](https://github.com/Askannz/optimus-manager) is a app that allows switching graphics modes, similar to how it's done in Pop!\_OS. I followed the instructions in README to configure Optimus without any issues. I also installed `optimus-manager-qt` for a nice little GUI switcher. Note that switching modes **requires a new session login**.

- Intel only mode - no external output
- Hybrid mode - no output
- NVIDIA mode - external monitor works well

## My solution

I ended up using the Optimus Manager setup. I followed [the instructions](https://github.com/Askannz/optimus-manager): installed the `nvidia` and the `intel` and `optimus-manager` packages, configured everything according to the README.

Since having to log back into a new session is a bit annoying, I added an extra boot option in my GRUB settings with the `optimus-manager.startup=nvidia` kernel parameter. Now when I know I need to use a monitor, I'll boot into Manjaro with the NVIDIA boot option.

Intel-only mode gives me around 7-8 hours of browsing and watching Youtube or 4-6 hours of web development with WebStorm (fairly resource intensive IDE) with multiple browsers open. For such a powerful laptop and a bright screen that's pretty good in my opinion.

When I need to plug in my 4K monitor, NVIDIA mode hasn't given me any issues yet, seems to work well.
