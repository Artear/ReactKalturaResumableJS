import "babel-polyfill";
import createComponent from "./helpers/shallowRenderHelper";
import ReactKalturaResumableJs from "../src/ReactKalturaResumableJs";
import {expect} from "chai";
import "jsdom-global/register";
import React from "react";

describe('React Kaltura Resumable', function () {


    let component;

    let optionsObject = {
        'uploaderID': 'kaltura-uploader',
    };

    beforeEach(() => {
        component = createComponent(ReactKalturaResumableJs, {optionsObject});
    });

    it('should have component id as dropTarget', () => {
        expect(component.type).to.equal('div');
    });

});