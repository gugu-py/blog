---
title: CLI Guide：Managing Partitions in Linux
date: 2025-10-01 14:06:04
tags: linux
categories: code
---

 🛠 CLI Guide: Managing Partitions in Linux

As a fan of local music player, my partition for Music is full. In order to create a bigger partition to fit my developing music taste, I copied my music collection to backup; deleted the original music paritition; compressed its previous partition; created a new partition out of the free space. This is how I did it, thanks GPT.


> ⚠️ Partitioning can destroy data. Always **double-check device names** and back up important files before deleting or creating partitions.


## 1. List disks and partitions

To see all devices, filesystems, and mount points:

```bash
lsblk -f
```

Shows:

- `NAME` → device (e.g., `nvme0n1p5`)
    
- `FSTYPE` → filesystem (ext4, ntfs, exfat, etc.)
    
- `LABEL` and `UUID` → useful for identifying in `/etc/fstab`
    
- `MOUNTPOINTS` → where it’s mounted
    

To also check partition numbers and sizes:

```bash
sudo fdisk -l
```



## 2. Show free space on the disk

Use `parted`:

```bash
sudo parted /dev/nvme0n1 unit s print free
```

This shows sectors (`Start` → `End`) and highlights **Free Space** areas.



## 3. Unmount before changes

If a partition is mounted:

```bash
sudo umount /dev/nvme0n1pX
```

Confirm:

```bash
mount | grep nvme0n1pX   # should show nothing
```



## 4. Delete a partition

Use `parted` or `fdisk`.

**With parted:**

```bash
sudo parted -s /dev/nvme0n1 rm 9
```



## 5. Create a new partition in free space

Find the free space start/end from `parted print free`. Example:

```
1414328320s  1556498431s  Free Space
```

Then create:

```bash
sudo parted -s -a optimal /dev/nvme0n1 mkpart Music ext4 1414328320s 1556498431s
sudo partprobe /dev/nvme0n1   # refresh partition table
```

Confirm it exists:

```bash
lsblk -f
```



## 6. Format the partition

Format as ext4 and give it a label:

```bash
sudo mkfs.ext4 -L Music /dev/nvme0n1p9
```



## 7. Mount it

```bash
sudo mkdir -p /mnt/music
sudo mount /dev/nvme0n1p9 /mnt/music
```

Check:

```bash
df -h | grep music
```



## 8. Give ownership to your user

```bash
sudo chown -R $USER:$USER /mnt/music
```

---

After those, I can enjoy music again, with greater space.

![](<https:/blog.gu33gu.asia/_resources/Pasted image 20251001140445.png> "a")

