import { checkIsAuthenticated } from "./checkIsAuthenticated";
import { Validator } from "../Validator";

import { PhotoGallery } from "../Model/PhotoGallery";
import { deletePhotoGallery, insertPhotoGallery, listPhotoGallery, listPhotoGalleryByPhotoGalleryId, updatePhotoGallery } from "../Services/DB/PhotoGalleryService";

export function photoGalleryRoute(app) {
    app.get('/api/photoGalleries', async function (req, res) {
        let photoGalleries: PhotoGallery[] = [];
        try {
            photoGalleries = await listPhotoGallery();
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(photoGalleries);
    });
    app.get('/api/photoGalleries/:photoGalleryId', async function (req, res) {
        const photoGalleryId = req.params.photoGalleryId;
        let photoGalleries: PhotoGallery[] = [];
        try {
            photoGalleries = await listPhotoGalleryByPhotoGalleryId(photoGalleryId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send(photoGalleries[0]);
    });
    app.post('/api/photoGalleries', checkIsAuthenticated("admin"), async function (req, res) {
        let photoGallery: PhotoGallery = new PhotoGallery(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.photoGalleryPostError(photoGallery));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await insertPhotoGallery(photoGallery);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });

    app.put('/api/photoGalleries/:photoGalleryId', checkIsAuthenticated("admin"), async function (req, res) {
        const photoGalleryId = req.params.photoGalleryId;

        const photoGallery: PhotoGallery = new PhotoGallery(req.body);
        let errors: Error[] = [];
        errors.push.apply(errors, Validator.photoGalleryPostError(photoGallery));
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).send(errors);
        }
        try {
            await updatePhotoGallery(photoGalleryId, photoGallery);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
        return res.status(200).send();
    });
    app.delete('/api/photoGalleries/:photoGalleryId', checkIsAuthenticated("admin"), async function (req, res) {
        const photoGalleryId = req.params.photoGalleryId;
        try {
            await deletePhotoGallery(photoGalleryId);
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }

        return res.status(200).send();
    });

}