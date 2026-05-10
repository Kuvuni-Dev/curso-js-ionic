# Formularios en Ionic

Ionic incluye controles de formulario adaptados a dispositivos móviles.

## Inputs y toggles

- `ion-input`: campo de texto con varias configuraciones.
- `ion-toggle`: interruptor on/off.
- `ion-checkbox`: casilla de verificación.
- `ion-radio-group` + `ion-radio`: selección exclusiva.

## Select y picker

`ion-select` abre una lista de opciones nativa.

```html
<ion-item>
  <ion-label>Color</ion-label>
  <ion-select>
    <ion-select-option value="rojo">Rojo</ion-select-option>
    <ion-select-option value="verde">Verde</ion-select-option>
  </ion-select>
</ion-item>
```

`ion-datetime` permite elegir fecha y hora con interfaz nativa.

## Controles de texto

`ion-textarea` crea áreas multilínea con ajuste automático.

## Validación y experiencia

Combina los componentes con eventos como `ionChange` e `ionInput` para validar y mostrar errores en tiempo real.
