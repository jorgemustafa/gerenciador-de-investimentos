import React from "react";
import {Col, Row} from '@themesberg/react-bootstrap';
import {ChoosePhotoWidget} from "../components/Widgets";
import {GeneralInfoForm} from "../components/Forms";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import ProfileModal from "../components/ProfileModal";


export default () => {
    return (
        <>
            <Row>
                <Col xs={12} xl={6}>
                    <GeneralInfoForm/>
                </Col>
                <Col xs={12} xl={6}>
                    <ChoosePhotoWidget
                        title="Escolha uma foto de perfil"
                        photo={Profile3}
                    />
                </Col>
            </Row>
        </>
    );
};
