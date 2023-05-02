import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const PDFstyles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundColor: '#FFFFFF'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
});

// Create Document Component
const SoundBitePDF = ({title, contents}) => (
    <Document>
        <Page size="A4" style={PDFstyles.page}>
            <Text style={PDFstyles.title}>{title}</Text>
            <Text style={PDFstyles.text}>{contents}</Text>
        </Page>
    </Document>
);

export default SoundBitePDF;

