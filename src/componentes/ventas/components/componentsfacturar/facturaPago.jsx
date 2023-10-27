/* eslint-disable react/prop-types */
import {Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer"
// eslint-disable-next-line react/prop-types
export const Factura = ({ventaRealizada}) => {

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: '#fff',
          padding: 20,
        },
        titleContainer: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        },
        titleText: {
          fontSize: 20,
        },
        infoContainer: {
          marginBottom: 10,
        },
        infoText: {
          fontSize: 12,
          marginBottom: 5,
        },
        productTable: {
          flexDirection: 'column',
          width: '100%',
          marginTop: 10,
        },
        tableHeaderRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
          paddingBottom: 5,
          marginBottom: 5,
          width: '100%',
        },
        tableRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
          width: '100%',
        },
        tableHeader: {
          fontWeight: 'bold',
          width: '50%',
        },
        totalRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            borderTopWidth: 1,
            borderTopColor: '#000',
            paddingTop: 5,
          },
        totalLabel: {
          fontWeight: 'bold',
        },
        totalValue: {
          fontWeight: 'bold',
        },
        paymentRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        },
        paymentLabel: {
          fontWeight: 'bold',
        },
        paymentValue: {},
        refundRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        },
        refundLabel: {
          fontWeight: 'bold',
        },
        refundValue: {},
      });
      
    return (
        <Document>
             <Page size="A4" style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Tu factura</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Factura de</Text>
        <Text style={styles.infoText}>NIT: 11231231</Text>
        <Text style={styles.infoText}>Celular</Text>
      </View>
      <View style={styles.productTable}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeader}>Producto</Text>
          <Text style={{ width: '50%' }}>unidades</Text>
          <Text style={[styles.tableHeader, { textAlign: 'right' }]}>Total</Text>
        </View>
        {ventaRealizada.productosVendidos.map((e, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={{ width: '50%' }}>{e.nombre}</Text>
            <Text style={{ width: '50%' }}>{e.unidades}</Text>
            <Text style={{ textAlign: 'right' }}>{e.valor_total}</Text>
          </View>
        ))}
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total venta</Text>
        <Text style={styles.totalValue}>{ventaRealizada.valorTotal}</Text>
      </View>
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Efectivo</Text>
        <Text style={styles.paymentValue}>{ventaRealizada.pagaCon}</Text> 
      </View>
      <View style={styles.refundRow}>
        <Text style={styles.refundLabel}>Devolución</Text>
        <Text style={styles.refundValue}>{ventaRealizada.devolucion}</Text> 
      </View>
    </Page>
        </Document>
        
    )
}