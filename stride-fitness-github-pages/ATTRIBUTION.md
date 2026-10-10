# Third-party anatomy asset attribution

This repository's application code is original. The optional `public/anatomy.glb` is a third-party derived scientific anatomical mesh from [JohanBellander/BodyExplorer](https://github.com/JohanBellander/BodyExplorer), which is distributed separately under the licenses of its underlying datasets. The app does not redistribute the mesh unless `npm run anatomy:download` has been run.

## Anatomical model

- **BodyParts3D** — © The Database Center for Life Science, Japan; [CC BY-SA 2.1 Japan](https://creativecommons.org/licenses/by-sa/2.1/jp/). The original MRI-based meshes form the majority of BodyExplorer's anatomy data.
- **Z-Anatomy** — Gauthier Kervyn and contributors; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Derived additional muscular structures from the freely licensed Z-Anatomy project. See [Z-Anatomy source](https://github.com/Z-Anatomy/Models-of-human-anatomy).
- **BodyExplorer** — Johannes Bellander / JohanBellander's compiled and reduced browser meshes; [project source](https://github.com/JohanBellander/BodyExplorer). Original application code MIT; 3D anatomical meshes retain the above dataset licenses.

**Modifications in Stride:** The downloaded GLB is unmodified on disk; at runtime its vertex axes are remapped from native BodyParts3D coordinate conventions to a Three.js upright pose, materials are assigned for neutral display, and named nodes are associated with fitness muscle groups for selection. These transforms and display changes are not medical reconstructions. Any further redistribution/adaptation of the geometry must preserve attribution and applicable share-alike conditions.

## 2D fallback

The simplified interactive SVG region guide is an original programmatic illustration created for Stride. It is **not** a medical-grade reference and is never described as a 3D model. A separate accurate licensed whole-body female muscular mesh has not been bundled; the female toggle uses the labeled 2D guide to keep the same set of clickable learning targets.

## Exercise library

All exercises, brief form descriptions and cue text in this repository are authored for this project. Fitness Programmer and ExRx informed the request, but their proprietary media, descriptions and site content have not been copied. See their respective websites for supplementary exercise demonstrations.
